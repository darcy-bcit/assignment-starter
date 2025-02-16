package main

import (
	"flag"
	"fmt"
	"log"
	"path/filepath"

	"github.com/darcy-bcit/assignment-starter/cli/internal/codegen"
	"github.com/darcy-bcit/assignment-starter/cli/internal/dirgen"
	"github.com/darcy-bcit/assignment-starter/cli/internal/yml"
)

func main() {
    // getopt
    configFile := flag.String("config", "config.yaml", "Path to YAML configuration file")
    outputPath := flag.String("output", "", "Output directory path (default: current directory)")
    genType := flag.String("generate", "all", "What to generate: 'code', 'docs', or 'all' (default: all)")
    flag.Parse()

    // check genType
    switch *genType {
    case "code", "docs", "all":
        // valid
    default:
        log.Fatalf("Invalid generation type. Must be 'code', 'docs', or 'all'")
    }

    // Parse config yaml
    cfg, err := yml.ParseConfig(*configFile)
    if err != nil {
        log.Fatalf("Failed to parse config file: %v", err)
    }

    // Convert the path to an absolute path
    if *outputPath != "" {
        absPath, err := filepath.Abs(*outputPath)
        if err != nil {
            log.Fatalf("Failed to resolve output path: %v", err)
        }
        cfg.OutputPath = absPath
    }

    dirManager := dirgen.NewDirectoryManager(cfg.OutputPath, cfg.ProjectName)

    // Prepare the output directory for both code and docs
    if err := dirManager.PrepareDirectories(*genType); err != nil {
        log.Fatalf("Failed to prepare directories: %v", err)
    }

    codeGenerator := codegen.NewGenerator(cfg, dirManager)
    // docs generator here ->

    switch *genType {
    case "code":
        if err := codeGenerator.Generate(); err != nil {
            log.Fatalf("Failed to generate code: %v", err)
        }
    case "docs":
        // doc gen here
    case "all":
        if err := codeGenerator.Generate(); err != nil {
            log.Fatalf("Failed to generate code: %v", err)
        }
        // doc gen here again
    }
    
    fmt.Printf("Successfully generated %s.\n", *genType)
}
