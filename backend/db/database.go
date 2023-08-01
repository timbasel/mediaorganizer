package db

import (
	"context"
	"os"

	"github.com/go-rel/rel"
	"github.com/go-rel/sqlite3"
	_ "github.com/mattn/go-sqlite3"
	"github.com/timbasel/go-log/pkg/log"
	"github.com/timbasel/mediaorganizer/backend/db/migrations"
)

type Database struct {
	rel.Repository
	close func() error
}

func Open(filepath string) *Database {
	adapter, err := sqlite3.Open(filepath)
	if err != nil {
		log.Error(err.Error())
		os.Exit(-1)
	}
	repository := rel.New(adapter)

	migrations.Migrate(context.Background(), repository)

	return &Database{
		Repository: repository,
		close:      adapter.Close,
	}
}

func (db *Database) Close() error {
	return db.close()
}
