import { Button, Container, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    initBotbear,
    isBotbearAvailable,
    upgradeBotbear,
} from "../../modules/botbear/Driver";
import { getBoolean, set } from "../../modules/config/ConfigSupport";
import { submitError, submitInfo, submitSucc } from "../Message";
import {
    LibearXL_DEFAULT_THEME_DARK,
    LibearXL_DEFAULT_THEME_LIGHT,
    isBgDark,
} from "../Renderer";
import { useTextStyles } from "../Stylex";
import { tr } from "../Translator";

export function Botbear(): JSX.Element {
    const classes = useTextStyles();
    const [enabled, setEnabled] = useState(getBoolean("interactive.botbear"));
    const [isRunning, setRunning] = useState(false);
    const [available, setAvailable] = useState(false);
    useEffect(() => {
        void (async () => {
            setAvailable(await isBotbearAvailable());
        })();
    }, []);
    return (
        <ThemeProvider
            theme={
                isBgDark() ? LibearXL_DEFAULT_THEME_DARK : LibearXL_DEFAULT_THEME_LIGHT
            }
        >
            <Container>
                <Typography className={classes.secondText} gutterBottom>
                    {tr("Botbear.Desc")}
                </Typography>
                <br />
                <Typography className={classes.secondText} gutterBottom>
                    {tr(
                        available
                            ? enabled
                                ? "Botbear.Enabled"
                                : "Botbear.Disabled"
                            : "Botbear.NotInstalled"
                    )}
                </Typography>
                <br />

                <Button
                    color={"primary"}
                    variant={"contained"}
                    disabled={isRunning}
                    onClick={async () => {
                        if (available) {
                            if (enabled) {
                                set("interactive.botbear", false);
                                setEnabled(false);
                            } else {
                                set("interactive.botbear", true);
                                setEnabled(true);
                            }
                        } else {
                            try {
                                setRunning(true);
                                submitInfo(tr("Botbear.Installing"));
                                if (!(await upgradeBotbear())) {
                                    throw "Upgrade Failed!";
                                }
                                set("interactive.botbear", true);
                                setEnabled(true);
                                setAvailable(true);
                                await initBotbear();
                                submitSucc(tr("Botbear.InstallOK"));
                            } catch {
                                submitError(tr("Botbear.FailedToInstall"));
                            }
                        }
                    }}
                >
                    {tr(
                        available
                            ? enabled
                                ? "Botbear.Disable"
                                : "Botbear.Enable"
                            : "Botbear.Install"
                    )}
                </Button>
                <br />
                <br />
                <Typography className={classes.secondText} gutterBottom>
                    {tr("Botbear.Hint")}
                </Typography>
            </Container>
        </ThemeProvider>
    );
}
