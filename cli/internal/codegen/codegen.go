package codegen

import (
	"fmt"

	"github.com/darcy-bcit/assignment-starter/cli/internal/codegen/languages"
	"github.com/darcy-bcit/assignment-starter/cli/internal/dirgen"
	"github.com/darcy-bcit/assignment-starter/cli/internal/yml/types"
)

type Generator struct {
    config *types.Config
    dirManager *dirgen.DirectoryManager
}

// wrapper to create a new Generator instance
func NewGenerator(config *types.Config, dirManager *dirgen.DirectoryManager) *Generator {
    return &Generator{
        config: config,
        dirManager: dirManager,
    }
}

// coordinates the code generation process
func (g *Generator) Generate() error {
    langGenerator, err := languages.GetGenerator(g.config.Language)
    if err != nil {
        return fmt.Errorf("failed to get language generator: %w", err)
    }

    projectPath := g.dirManager.GetProjectPath()
    if err := langGenerator.Generate(projectPath, g.config); err != nil {
        return fmt.Errorf("failed to generate code: %w", err)
    }

    return nil
}
