package migrations

import (
	"context"

	"github.com/go-rel/migration"
	"github.com/go-rel/rel"
)

type Migration struct {
	version int
	up      func(schema *rel.Schema)
	down    func(schema *rel.Schema)
}

var Migrations = []Migration{}

func Migrate(ctx context.Context, repo rel.Repository) {
	m := migration.New(repo)
	for _, migration := range Migrations {
		m.Register(migration.version, migration.up, migration.down)
	}
	m.Migrate(ctx)
}

func Rollback(ctx context.Context, repo rel.Repository) {
	m := migration.New(repo)
	for _, migration := range Migrations {
		m.Register(migration.version, migration.up, migration.down)
	}
	m.Rollback(ctx)
}
