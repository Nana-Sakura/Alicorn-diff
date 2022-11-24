import fs from "fs-extra";
import os from "os";
import path from "path";
// Place a symlink at ~/LibearXL, so that our bootstrap in packs can find it
export async function setBeacon(): Promise<void> {
    // No longer using, use this to remove files for our users.
    try {
        const target = path.join(os.homedir(), "LibearXL-is-here");
        await fs.remove(target);
    } catch (e) {
        console.log(e);
    }
}
