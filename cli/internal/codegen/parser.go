package codegen

import (
    "fmt"
    "os"

    "github.com/goccy/go-yaml"
    "github.com/darcy-bcit/assignment-starter/cli/internal/codegen/types"
)

// parses config.yaml
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

// basic validation, for now only checks if empty
func validateConfig(config *types.Config) error {
    if config.ProjectName == "" {
        return fmt.Errorf("project name is required")
    }

    if config.Language != "C" {
        return fmt.Errorf("only C language is supported in this version")
    }

    return nil
}
