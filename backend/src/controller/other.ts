import { Request, Response, NextFunction } from "express";
import * as fs from 'fs/promises';
import * as path from 'path';

import HandlerError from "../error";
import dbThemes from "../db/tables/themes";
import dbSpecialists from "../db/tables/specialists";
import dbEmployees from "../db/tables/employees";




class Other {
    
    async  report(req: Request, res: Response, next: NextFunction) {
        let filePath: string | null = null;

        try {
            const [themes, employees, specialists] = await Promise.all([
                dbThemes.statics(),
                dbEmployees.statics(),
                dbSpecialists.statics()
            ]);

            if (!themes || !employees || !specialists) {
                const missing = [];
                if (!themes) missing.push("themes");
                if (!employees) missing.push("employees");
                if (!specialists) missing.push("specialists");
                return next(HandlerError.internal("Report get data from db:", `${missing.join(", ")}`));
            }

            const reportContent = JSON.stringify({
                date: new Date().toLocaleDateString("ru"),
                themes,
                employees,
                specialists
            }, null, 2);



            const publicDir = path.join(__dirname, "..", "..", "public");
            try {
                await fs.access(publicDir);
            } catch {
                await fs.mkdir(publicDir, { recursive: true });
            }

            filePath = path.join(publicDir, `report-${Date.now()}.json`);
            await fs.writeFile(filePath, reportContent);

            // Проверка наличия tmp-файла
            try {
                await fs.stat(filePath);
            } catch (statError) {
                return next(HandlerError.internal("Download error:", "Temporary file could not be accessed."));
            }

            res.download(filePath, "report.json", (err) => {
                if (err) {
                    return next(HandlerError.internal("Download error:", err.message));
                }

                //удаляем tmp-файл после скачки
                if (filePath) {
                    fs.unlink(filePath)
                    .catch((cleanupError) => {
                    console.error("Report delete tmp file:", cleanupError);
                    });
                }
            });
        } catch (err: any) {
            return next(HandlerError.internal("Report generation error:", err instanceof Error ? err.message : String(err)));
        }
    }
}

export default new Other();