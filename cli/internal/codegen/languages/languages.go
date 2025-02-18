package languages

import (
	"fmt"

	"github.com/darcy-bcit/assignment-starter/cli/internal/yml/types"
)

type Generator interface {
    Generate(projectPath string, config *types.Config) error
}

func GetGenerator(language string) (Generator, error) {
    switch language {
    case "C":
        return NewCGenerator(), nil
    default:
        return nil, fmt.Errorf("unsupported language: %s", language)
    }
}
