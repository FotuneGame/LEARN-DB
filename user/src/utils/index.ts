import { genHash, genJWT, verJWT, eHash } from "./jwt";
import { upload } from "./loadFile";

export const generateHash = genHash;
export const generateJWT = genJWT;
export const verifyJWT = verJWT;
export const equalsHash = eHash;

export const loadAvatar = upload;