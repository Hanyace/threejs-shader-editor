import TopBar from "../components/TopBar";
import ShaderViewer from "../components/ShaderViewer";
import ShaderEditor from "../components/ShaderEditor";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useStore } from "@/store";

const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            primary: { main: "#FD5B0C" },
            text:
                mode === "dark"
                    ? { primary: "#fff", secondary: "#757575" }
                    : { primary: "#222", secondary: "#666" },
            background:
                mode === "dark"
                    ? { default: "#222", paper: "#333" }
                    : { default: "#fff", paper: "#fdfdfd" },
        },
    });

const Layout = () => {
    const colorMode = useStore((state) => state.colorMode);
    const theme = getTheme(colorMode);
    return (
        <main id="layout">
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        background: theme.palette.background.paper,
                    }}
                    className="h-screen overflow-hidden flex flex-col"
                >
                    <TopBar />
                    <div className="flex-1 overflow-hidden flex">
                        <ShaderViewer />
                        <ShaderEditor />
                    </div>
                </div>
            </ThemeProvider>
        </main>
    );
};

export default Layout;
