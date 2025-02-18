package dirgen

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type DirectoryManager struct {
	basePath    string
	projectName string
	reportPath  string
}

func NewDirectoryManager(basePath, projectName string) *DirectoryManager {
	if basePath == "" {
		currentDir, _ := os.Getwd()
		basePath = currentDir
	}

	return &DirectoryManager{
		basePath:    basePath,
		projectName: projectName,
		reportPath:  filepath.Join(basePath, projectName, "report"),
	}
}

func (dm *DirectoryManager) PrepareDirectories(genType string) error {
	projectPath := filepath.Join(dm.basePath, dm.projectName)

	var dirsToCheck []string
	switch genType {
	case "code":
		dirsToCheck = []string{
			filepath.Join(projectPath, "source", "src"),
			filepath.Join(projectPath, "source", "include"),
		}
	case "docs":
		dirsToCheck = []string{
			filepath.Join(projectPath, "report"),
		}
	case "all":
		dirsToCheck = []string{
			filepath.Join(projectPath, "source", "src"),
			filepath.Join(projectPath, "source", "include"),
			filepath.Join(projectPath, "report"),
		}
	}

	for _, dir := range dirsToCheck {
		if exists, notEmpty := dm.checkDirectory(dir); exists {
			if notEmpty {
				proceed, err := dm.promptUserForOverwrite(dir)
				if err != nil {
					return fmt.Errorf("user prompt failed: %w", err)
				}
				if !proceed {
					return fmt.Errorf("user cancelled generation for %s", dir)
				}
			}
		} else {
			if err := os.MkdirAll(dir, 0755); err != nil {
				return fmt.Errorf("failed to create directory %s: %w", dir, err)
			}
		}
	}
	return nil
}

// returns exists(bool) and notEmpty(bool)
func (dm *DirectoryManager) checkDirectory(path string) (bool, bool) {
	dir, err := os.Open(path)
	if err != nil {
		if os.IsNotExist(err) {
			return false, false
		}
		return false, false
	}
	defer dir.Close()

	// Read one entry from the dir
	_, err = dir.Readdirnames(1)
	if err != nil { // dir is empty
		return true, false
	}
	return true, true // dir contains at least one thing
}

func (dm *DirectoryManager) promptUserForOverwrite(path string) (bool, error) {
	reader := bufio.NewReader(os.Stdin)
	fmt.Printf("Directory %s already exists and contains files. Overwrite? (y/N): ", path)

	response, err := reader.ReadString('\n')
	if err != nil {
		return false, fmt.Errorf("failed to read user input: %w", err)
	}

	response = strings.ToLower(strings.TrimSpace(response))
	return response == "y" || response == "yes", nil
}

// GetProjectPath returns the full project path
func (dm *DirectoryManager) GetProjectPath() string {
	return filepath.Join(dm.basePath, dm.projectName)
}

func (dm *DirectoryManager) GetReportPath() string {
	return dm.reportPath
}
