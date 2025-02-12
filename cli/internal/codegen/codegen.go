package codegen

import (
    "fmt"
    "os"
    "path/filepath"
    "strings"

    "github.com/darcy-bcit/assignment-starter/cli/internal/codegen/types"
)

// main generator type
type Generator struct {
    config *types.Config
}

// creates a new Generator instance
func NewGenerator(config *types.Config) *Generator {
    return &Generator{
        config: config,
    }
}

// code gen process
func (g *Generator) Generate() error {
    // Create project directories
    if err := g.createDirectories(); err != nil {
        return fmt.Errorf("failed to create directories: %w", err)
    }

    // Generate code files
    for _, file := range g.config.Files {
        if err := g.generateFile(file); err != nil {
            return fmt.Errorf("failed to generate file %s: %w", file.Name, err)
        }
    }

    return nil
}

// creates the necessary project directories
func (g *Generator) createDirectories() error {
    dirs := []string{
        filepath.Join(g.config.ProjectName, "source", "src"),
        filepath.Join(g.config.ProjectName, "source", "include"), // only for C & C++
    }

    for _, dir := range dirs {
        if err := os.MkdirAll(dir, 0755); err != nil {
            return err
        }
    }
    return nil
}

// generates both header and source files for a given file configuration
func (g *Generator) generateFile(file types.FileConfig) error {
    // Generate header file
    headerPath := filepath.Join(g.config.ProjectName, "source", "include", file.Name+".h")
    headerContent := g.generateHeader(file)
    if err := os.WriteFile(headerPath, []byte(headerContent), 0644); err != nil {
        return fmt.Errorf("failed to write header file: %w", err)
    }

    // Generate source file
    sourcePath := filepath.Join(g.config.ProjectName, "source", "src", file.Name+".c")
    sourceContent := g.generateSource(file)
    if err := os.WriteFile(sourcePath, []byte(sourceContent), 0644); err != nil {
        return fmt.Errorf("failed to write source file: %w", err)
    }

    return nil
}

// generates C header file content
func (g *Generator) generateHeader(file types.FileConfig) string {
    var sb strings.Builder

    guardName := strings.ToUpper(file.Name) + "_H"
    sb.WriteString(fmt.Sprintf("#ifndef %s\n", guardName))
    sb.WriteString(fmt.Sprintf("#define %s\n\n", guardName))

    // Generate struct definitions
    for _, typ := range g.config.Types {
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

// generates C source file content
func (g *Generator) generateSource(file types.FileConfig) string {
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
