package main

import (
	"log"

	"github.com/gomutex/godocx"
)

func main() {
	// Open an existing DOCX document
	// document, err := godocx.OpenDocument("./testdata/test.docx")

	// Create New Document
	document, err := godocx.NewDocument()
	if err != nil {
		log.Fatal(err)
	}

	// Save the modified document to a new file
	err = document.SaveTo("./output/report/user-guide.docx")
	if err != nil {
		log.Fatal(err)
	}

	err = document.SaveTo("./output/report/testing.docx")
	if err != nil {
		log.Fatal(err)
	}

	err = document.SaveTo("./output/report/report.docx")
	if err != nil {
		log.Fatal(err)
	}

	err = document.SaveTo("./output/report/design.docx")
	if err != nil {
		log.Fatal(err)
	}
}
