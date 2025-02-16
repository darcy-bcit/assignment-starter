package main

import (
	"log"

	"github.com/gomutex/godocx"
)

const DOCUMENT_DIR string = "./output/report/"
const DOCUMENT_EXT string = ".docx"

func createDoc(docname string) {
	document, err := godocx.NewDocument()
	if err != nil {
		log.Fatal(err)
	}

	err = document.SaveTo(DOCUMENT_DIR + docname + DOCUMENT_EXT)
	if err != nil {

	}
}

func main() {

	createDoc("testing")
	createDoc("user-guide")
	createDoc("report")
	createDoc("design")
}
