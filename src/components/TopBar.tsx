import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
    GitHub as GithubIcon,
    Brightness4 as SunIcon,
    Brightness7 as MoonIcon,
    Code as CodeIcon,
} from "@mui/icons-material";
import { useStore } from "@/store"

const TopBar = () => {
    const colorMode = useStore((state) => state.colorMode);
    const setColorMode = useStore((state) => state.setColorMode);
    const onToggleDarkMode = () => {
        setColorMode(colorMode === "light" ? "dark" : "light");
    };
    return (
        <div className="text-white">
            <AppBar
                position="static"
                enableColorOnDark
                color="primary"
                elevation={1}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        className="text-white flex gap-2 items-center select-none"
                    >
                        <CodeIcon />
                        Shader Editor For Three.js
                    </Typography>
                    <IconButton
                        color="inherit"
                        href={import.meta.env.VITE_GITHUB_LINK}
                        target="_blank"
                        rel="noopener"
                        sx={{ mr: 1 }}
                    >
                        <GithubIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={onToggleDarkMode}>
                        {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopBar;
