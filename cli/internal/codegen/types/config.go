package types

// structure of the config.yaml
type Config struct {
    Language string `yaml:"language"`
    ProjectName string `yaml:"projectName"`
    Types []TypeConfig `yaml:"types"`
    Files []FileConfig `yaml:"files"`
}

// generic type/struct/class definition
type TypeConfig struct {
    Name string `yaml:"name"`
    Fields []FieldConfig `yaml:"fields"`
}

// inner field of a struct type
type FieldConfig struct {
    Name string `yaml:"name"`
    Type string `yaml:"type"`
}

// source file
type FileConfig struct {
    Name string `yaml:"name"`
    Functions []FunctionConfig `yaml:"functions"`
}

// function def
type FunctionConfig struct {
    Name string `yaml:"name"`
    Parameters []ParameterConfig `yaml:"parameters"`
    ReturnType string `yaml:"returnType"`
}

// inner parameters for each function
type ParameterConfig struct {
    Name string `yaml:"name"`
    Type string `yaml:"type"`
}

