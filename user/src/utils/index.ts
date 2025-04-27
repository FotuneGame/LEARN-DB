import { genHash, genJWT, verJWT, eHash } from "./jwt";
import {generateRandomString} from"./codeGen";

export const generateHash = genHash;
export const generateJWT = genJWT;
export const verifyJWT = verJWT;
export const equalsHash = eHash;

export const codeGen = generateRandomString;