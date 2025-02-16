package main

import (
	"log"

	"github.com/gomutex/godocx"
	"github.com/gomutex/godocx/docx"
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

func AddTableToDoc(doc *docx.RootDoc, data [][]string) {

	table := doc.AddTable()

	for i := 0; i < len(data); i++ {
		row := table.AddRow()

		for j := 0; j < len(data[i]); j++ {
			row.AddCell().AddParagraph(data[i][j])
		}
	}

}

func main() {

	doc, err := godocx.NewDocument()
	if err != nil {
		log.Fatalf("Failed to open document: %v", err)
	}
	data := [][]string{
		{"ID", "Name", "Age"},
		{"1", "Alice", "25"},
		{"2", "Bob", "30"},
	}

	AddTableToDoc(doc, data)

	err = doc.SaveTo("table.docx")
	if err != nil {
		log.Fatalf("Failed to save document: %v", err)
	}

	log.Println("Document saved as output.docx")

	createDoc("testing")
	createDoc("user-guide")
	createDoc("report")
	createDoc("design")
}
