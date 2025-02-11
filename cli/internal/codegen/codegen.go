package codegen

import (
    "fmt"
    "log"
    "os"
)

func GenCode() {
}

func genDir(path string) {
    err := os.MkdirAll(path, 0755)
    if err != nil {
        log.Fatal(err)
    }
}

func genFile(path string, name string) {
    fileName := fmt.Sprintf("%s%s", path, name)
    fd, err := os.Create(fileName)
    if err != nil {
        log.Fatal(err)
    }

    if err := fd.Close(); err != nil {
        log.Fatal(err)
    }
}

func genFunc(name string) {

}
