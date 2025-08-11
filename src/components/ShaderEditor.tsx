import Editor, { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import EnhanceMaterialTheme from "@/configs/editor/theme/enhance-material.json";
import IntelliJLightFlutter from "@/configs/editor/theme/intelli-j-light-flutter.json";
import { useStore } from "@/store";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import * as MonacoGLSL from "@/configs/editor/lang/glsl";

const ShaderEditor = () => {
    const monaco = useMonaco();
    const fragmentShader = useStore((state) => state.fragmentShader);
    const [localFragmentShader, setLocalFragmentShader] =
        useState(fragmentShader);
    const setFragmentShader = useStore((state) => state.setFragmentShader);
    const colorMode = useStore((state) => state.colorMode);

    const handleRun = () => {
        console.log("Running shader...");
        setFragmentShader(localFragmentShader);
    };

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("enhance-material", {
                base: "vs-dark",
                inherit: true,
                rules: EnhanceMaterialTheme.tokenColors.map((rule) => ({
                    token: rule.scope as string,
                    foreground: rule.settings.foreground,
                    fontStyle: rule.settings.fontStyle,
                })),
                colors: EnhanceMaterialTheme.colors,
            });
            monaco.editor.defineTheme("light-flutter", {
                base: "vs",
                inherit: true,
                rules: IntelliJLightFlutter.tokenColors.map((rule) => ({
                    token: rule.scope as string,
                    foreground: rule.settings.foreground,
                    fontStyle: rule.settings.fontStyle,
                })),
                colors: IntelliJLightFlutter.colors,
            });

            // language register
            monaco.languages.register({ id: "three-glsl" });

            // highlight
            monaco.languages.setMonarchTokensProvider("three-glsl", {
                keywords: MonacoGLSL.GLSL_KEYWORDS,
                builtins: MonacoGLSL.GLSL_BUILTINS,
                typeKeywords: MonacoGLSL.TYPE_KEYWORDS,
                operators: MonacoGLSL.OPERATORS,
                tokenizer: MonacoGLSL.TOKENIZER,
            });

            // lint
            const model = monaco.editor
                .getModels()
                .find((m) => m.getLanguageId() === "three-glsl");
            if (model) {
                const value = model.getValue();
                const markers: editor.IMarkerData[] = [];
                if (!value.includes("void main")) {
                    markers.push({
                        severity: monaco.MarkerSeverity.Error,
                        message: "can't find void main",
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: 1,
                        endColumn: 10,
                    });
                }
                monaco.editor.setModelMarkers(model, "three-glsl", markers);
            }

            // 补全
            monaco.languages.registerCompletionItemProvider("three-glsl", {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    };
                    const suggestions = [
                        ...MonacoGLSL.GLSL_KEYWORDS.map((kw) => ({
                            label: kw,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: kw,
                            range,
                        })),
                        ...MonacoGLSL.GLSL_BUILTINS.map((fn) => ({
                            label: fn,
                            kind: monaco.languages.CompletionItemKind.Function,
                            insertText: fn + "()",
                            range,
                        })),
                    ];
                    return { suggestions };
                },
            });
        }
    }, [monaco]);

    useEffect(() => {
        const isDark = colorMode === "dark";
        if (monaco) {
            monaco.editor.setTheme(
                isDark ? "enhance-material" : "light-flutter"
            );
        }
    }, [colorMode, monaco]);

    return (
        <div className="flex-2/5 relative m-2 rounded-lg overflow-hidden shadow-md">
            <Editor
                height="100%"
                language="three-glsl"
                theme="vs"
                value={fragmentShader}
                onChange={(value) => setLocalFragmentShader(value ?? "")}
                onMount={() => console.log("editor mounted")}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={handleRun}
                sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    zIndex: 10,
                    boxShadow: 2,
                }}
            >
                Run
            </Button>
        </div>
    );
};

export default ShaderEditor;
