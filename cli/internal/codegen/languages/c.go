package languages

import (
    "fmt"
    "os"
    "path/filepath"
    "strings"

    "github.com/darcy-bcit/assignment-starter/cli/internal/yml/types"
)

type CGenerator struct{}

func NewCGenerator() *CGenerator {
    return &CGenerator{}
}

func (g *CGenerator) Generate(projectPath string, config *types.Config) error {
    for _, file := range config.Files {
        if err := g.generateFile(projectPath, file, config.Types); err != nil {
            return fmt.Errorf("failed to generate file %s: %w", file.Name, err)
        }
    }
    return nil
}

func (g *CGenerator) generateFile(projectPath string, file types.FileConfig, types []types.TypeConfig) error {
    // Generate header file
    headerPath := filepath.Join(projectPath, "source", "include", file.Name+".h")
    headerContent := g.generateHeader(file, types)
    if err := os.WriteFile(headerPath, []byte(headerContent), 0644); err != nil {
        return fmt.Errorf("failed to write header file: %w", err)
    }

    // Generate source file
    sourcePath := filepath.Join(projectPath, "source", "src", file.Name+".c")
    sourceContent := g.generateSource(file)
    if err := os.WriteFile(sourcePath, []byte(sourceContent), 0644); err != nil {
        return fmt.Errorf("failed to write source file: %w", err)
    }

    return nil
}

func (g *CGenerator) generateHeader(file types.FileConfig, types []types.TypeConfig) string {
    var sb strings.Builder

    guardName := strings.ToUpper(file.Name) + "_H"
    sb.WriteString(fmt.Sprintf("#ifndef %s\n", guardName))
    sb.WriteString(fmt.Sprintf("#define %s\n\n", guardName))

    // Generate struct definitions
    for _, typ := range types {
        sb.WriteString(fmt.Sprintf("// %s represents a %s structure\n", typ.Name, typ.Name))
        sb.WriteString(fmt.Sprintf("typedef struct %s {\n", typ.Name))
        for _, field := range typ.Fields {
            sb.WriteString(fmt.Sprintf("    %s %s;\n", field.Type, field.Name))
        }
        sb.WriteString(fmt.Sprintf("} %s;\n\n", typ.Name))
    }

    // Generate function declarations
    for _, fn := range file.Functions {
        params := make([]string, len(fn.Parameters))
        for i, param := range fn.Parameters {
            params[i] = fmt.Sprintf("%s %s", param.Type, param.Name)
        }
        returnType := fn.ReturnType
        if returnType == "" {
            returnType = "void"
        }
        sb.WriteString(fmt.Sprintf("%s %s(%s);\n",
            returnType,
            fn.Name,
            strings.Join(params, ", ")))
    }

    sb.WriteString(fmt.Sprintf("\n#endif // %s\n", guardName))
    return sb.String()
}

func (g *CGenerator) generateSource(file types.FileConfig) string {
    var sb strings.Builder

    sb.WriteString(fmt.Sprintf("#include \"../include/%s.h\"\n\n", file.Name))

    // Generate function implementations
    for _, fn := range file.Functions {
        params := make([]string, len(fn.Parameters))
        for i, param := range fn.Parameters {
            params[i] = fmt.Sprintf("%s %s", param.Type, param.Name)
        }
        returnType := fn.ReturnType
        if returnType == "" {
            returnType = "void"
        }

        sb.WriteString(fmt.Sprintf("%s %s(%s) {\n",
            returnType,
            fn.Name,
            strings.Join(params, ", ")))

        // Add default return statement if needed
        if returnType != "void" {
            switch {
            case strings.Contains(returnType, "int"):
                sb.WriteString("    return 0;\n")
            case strings.Contains(returnType, "char"):
                sb.WriteString("    return '\\0';\n")
            case strings.Contains(returnType, "*"):
                sb.WriteString("    return NULL;\n")
            default:
                sb.WriteString("    return 0;\n")
            }
        }

        sb.WriteString("}\n\n")
    }

    return sb.String()
}

