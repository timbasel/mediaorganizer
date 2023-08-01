package migrations

import "github.com/go-rel/rel"

func init() {
	Migrations = append(Migrations, Migration{
		version: 202307290952,
		up: func(schema *rel.Schema) {
			schema.CreateTable("media", func(t *rel.Table) {
				t.ID("id", rel.Primary(true))

				t.String("path", rel.Unique(true))
				t.String("original_path", rel.Unique(true))

				t.BigInt("hash", rel.Unsigned(true))
				t.BigInt("size", rel.Unsigned(true))
				t.DateTime("mod_time")

				t.DateTime("created_at")
				t.DateTime("updated_at")

			})
			schema.CreateIndex("media", "index_media_path", []string{"path"})
			schema.CreateIndex("media", "index_media_hash", []string{"hash"})
		},
		down: func(schema *rel.Schema) {
			schema.DropTable("folders")
			schema.DropTable("media")
		},
	})
}
