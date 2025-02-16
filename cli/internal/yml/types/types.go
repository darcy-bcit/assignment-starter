// Package types contains structs that map to the the yaml fields
package types

// top level yaml file
type Config struct {
    OutputPath string
    ProjectName string `yaml:"projectName"`
    Language string `yaml:"language"`
    Types []TypeConfig `yaml:"types"`
    Files []FileConfig `yaml:"files"`
    States []StateConfig `yaml:"states"`
}

// Type is the generic name for classes, structs, and anything else like that.
type TypeConfig struct {
    Name string `yaml:"name"`
    Fields []FieldConfig `yaml:"fields"`
}

// inner field of a TypeConfig
type FieldConfig struct {
    Name string `yaml:"name"`
    Type string `yaml:"type"`
    Access string `yaml:"access"` // public, private, etc
}

// source file
type FileConfig struct {
    Name string `yaml:"name"`
    Functions []FunctionConfig `yaml:"functions"`
}

// function definition
type FunctionConfig struct {
    Name string `yaml:"name"`
    Parameters []ParameterConfig `yaml:"parameters"`
    ReturnType string `yaml:"returnType"`
    Access string `yaml:"access"`
}

// inner parameters for each function
type ParameterConfig struct {
    Name string `yaml:"name"`
    Type string `yaml:"type"`
}

type StateConfig struct {
    // Sprint 3
}
