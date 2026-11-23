IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE TABLE [Generos] (
        [Id] int NOT NULL IDENTITY,
        [Nombre] nvarchar(30) NOT NULL,
        CONSTRAINT [PK_Generos] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE TABLE [Miembros] (
        [Id] int NOT NULL IDENTITY,
        [Nombre] nvarchar(50) NOT NULL,
        [Correo] nvarchar(100) NOT NULL,
        [Registro] date NOT NULL,
        CONSTRAINT [PK_Miembros] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE TABLE [Series] (
        [Id] int NOT NULL IDENTITY,
        [Titulo] nvarchar(100) NOT NULL,
        [Temporadas] int NOT NULL,
        [Estado] nvarchar(10) NOT NULL,
        [GeneroId] int NOT NULL,
        [MiembroId] int NOT NULL,
        CONSTRAINT [PK_Series] PRIMARY KEY ([Id]),
        CONSTRAINT [CK_Series_Estado] CHECK ([Estado] IN (N'Por ver', N'Viendo', N'Vista')),
        CONSTRAINT [CK_Series_Temporadas] CHECK ([Temporadas] BETWEEN 1 AND 30),
        CONSTRAINT [FK_Series_Generos_GeneroId] FOREIGN KEY ([GeneroId]) REFERENCES [Generos] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Series_Miembros_MiembroId] FOREIGN KEY ([MiembroId]) REFERENCES [Miembros] ([Id]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Nombre') AND [object_id] = OBJECT_ID(N'[Generos]'))
        SET IDENTITY_INSERT [Generos] ON;
    EXEC(N'INSERT INTO [Generos] ([Id], [Nombre])
    VALUES (1, N''Drama''),
    (2, N''Comedia''),
    (3, N''Ciencia ficción''),
    (4, N''Animación''),
    (5, N''Documental'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Nombre') AND [object_id] = OBJECT_ID(N'[Generos]'))
        SET IDENTITY_INSERT [Generos] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Correo', N'Nombre', N'Registro') AND [object_id] = OBJECT_ID(N'[Miembros]'))
        SET IDENTITY_INSERT [Miembros] ON;
    EXEC(N'INSERT INTO [Miembros] ([Id], [Correo], [Nombre], [Registro])
    VALUES (1, N''ana@club.com'', N''Ana'', ''2026-08-01''),
    (2, N''luis@club.com'', N''Luis'', ''2026-08-03''),
    (3, N''sofia@club.com'', N''Sofía'', ''2026-08-10''),
    (4, N''diego@club.com'', N''Diego'', ''2026-09-02'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Correo', N'Nombre', N'Registro') AND [object_id] = OBJECT_ID(N'[Miembros]'))
        SET IDENTITY_INSERT [Miembros] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Estado', N'GeneroId', N'MiembroId', N'Temporadas', N'Titulo') AND [object_id] = OBJECT_ID(N'[Series]'))
        SET IDENTITY_INSERT [Series] ON;
    EXEC(N'INSERT INTO [Series] ([Id], [Estado], [GeneroId], [MiembroId], [Temporadas], [Titulo])
    VALUES (1, N''Vista'', 3, 1, 3, N''Dark''),
    (2, N''Viendo'', 2, 2, 9, N''The Office''),
    (3, N''Por ver'', 4, 3, 2, N''Arcane''),
    (4, N''Vista'', 1, 4, 1, N''Chernobyl''),
    (5, N''Por ver'', 5, 1, 3, N''Planeta Tierra'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Estado', N'GeneroId', N'MiembroId', N'Temporadas', N'Titulo') AND [object_id] = OBJECT_ID(N'[Series]'))
        SET IDENTITY_INSERT [Series] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Generos_Nombre] ON [Generos] ([Nombre]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Miembros_Correo] ON [Miembros] ([Correo]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE INDEX [IX_Series_GeneroId] ON [Series] ([GeneroId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    CREATE INDEX [IX_Series_MiembroId] ON [Series] ([MiembroId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117182530_Inicial'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20261117182530_Inicial', N'10.0.14');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117184058_GenerosFavoritos'
)
BEGIN
    CREATE TABLE [MiembroGeneros] (
        [MiembroId] int NOT NULL,
        [GeneroId] int NOT NULL,
        CONSTRAINT [PK_MiembroGeneros] PRIMARY KEY ([MiembroId], [GeneroId]),
        CONSTRAINT [FK_MiembroGeneros_Generos_GeneroId] FOREIGN KEY ([GeneroId]) REFERENCES [Generos] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_MiembroGeneros_Miembros_MiembroId] FOREIGN KEY ([MiembroId]) REFERENCES [Miembros] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117184058_GenerosFavoritos'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'GeneroId', N'MiembroId') AND [object_id] = OBJECT_ID(N'[MiembroGeneros]'))
        SET IDENTITY_INSERT [MiembroGeneros] ON;
    EXEC(N'INSERT INTO [MiembroGeneros] ([GeneroId], [MiembroId])
    VALUES (3, 1),
    (5, 1),
    (2, 2),
    (1, 3),
    (4, 3),
    (1, 4)');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'GeneroId', N'MiembroId') AND [object_id] = OBJECT_ID(N'[MiembroGeneros]'))
        SET IDENTITY_INSERT [MiembroGeneros] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117184058_GenerosFavoritos'
)
BEGIN
    CREATE INDEX [IX_MiembroGeneros_GeneroId] ON [MiembroGeneros] ([GeneroId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20261117184058_GenerosFavoritos'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20261117184058_GenerosFavoritos', N'10.0.14');
END;

COMMIT;
GO

