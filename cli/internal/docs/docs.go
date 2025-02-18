package docs

import (
	"log"
	"path/filepath"

	"github.com/gomutex/godocx"
	"github.com/gomutex/godocx/docx"
)

var documents = []string{
	"design.docx",
	"report.docx",
	"testing.docx",
	"user-guide.docx",
}

func CreateDocs(path string) {
	for _, doc := range documents {
		document, err := godocx.NewDocument()
		if err != nil {
			log.Fatal(err)
		}
		docPath := filepath.Join(path, doc)
		err = document.SaveTo(path + docPath)
		if err != nil {
			log.Fatal(err)
		}
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

/*
    // Evin your test code
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

*/
