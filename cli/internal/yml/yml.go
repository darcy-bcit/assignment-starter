// Package yml provides functions to parse the yaml file
package yml

import (
	"fmt"
	"os"

	"github.com/darcy-bcit/assignment-starter/cli/internal/yml/types"
	"github.com/goccy/go-yaml"
)

func ParseConfig(filename string) (*types.Config, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return nil, fmt.Errorf("failed to read config file: %w", err)
    }

    config := &types.Config{
        Language: "C", // Default language
    }

    if err := yaml.Unmarshal(data, config); err != nil {
        return nil, fmt.Errorf("failed to parse YAML: %w", err)
    }

    if err := validateConfig(config); err != nil {
        return nil, fmt.Errorf("invalid configuration: %w", err)
    }

    return config, nil
}

// basic validation, for now only checks for supported language
func validateConfig(config *types.Config) error {
    if config.ProjectName == "" {
        return fmt.Errorf("project name required")
    }

    if config.Language != "C" {
        return fmt.Errorf("unsupported language: %s", config.Language)
    }

    return nil
}
