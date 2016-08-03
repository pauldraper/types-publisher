"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const util_1 = require("./util");
function createSearchRecord(info, skipDownloads) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            p: info.projectName,
            l: info.libraryName,
            g: info.globals,
            t: info.typingsPackageName,
            m: info.declaredModules,
            d: yield getDownloads(),
            r: info.packageKind === "not-needed" ? info.sourceRepoURL : undefined
        };
        function getDownloads() {
            return __awaiter(this, void 0, void 0, function* () {
                if (skipDownloads) {
                    return -1;
                }
                else {
                    const url = `https://api.npmjs.org/downloads/point/last-month/${info.typingsPackageName}`;
                    const json = (yield util_1.fetchJson(url));
                    // Json may contain "error" instead of "downloads", because some packages aren't available on NPM.
                    return json.downloads || 0;
                }
            });
        }
    });
}
exports.createSearchRecord = createSearchRecord;
//# sourceMappingURL=search-index-generator.js.map