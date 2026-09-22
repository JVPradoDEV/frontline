# Backend

Backend da aplicação desenvolvido com Django e Django REST Framework.

O projeto utiliza o Supabase para:

- Banco de dados PostgreSQL
- Armazenamento de imagens através do Supabase Storage

## Tecnologias utilizadas

- Python
- Django
- Django REST Framework
- PostgreSQL
- Supabase
  - Database
  - Storage

## Pré-requisitos

- Python 3.x
- Git
- Projeto no Supabase

## 1. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd backend
```

## 2. Criar o ambiente virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python -m venv venv
source venv/bin/activate
```

## 3. Instalar as dependências

```bash
pip install -r requirements.txt
```

## 4. Configurar o Supabase Storage

No painel do Supabase:

1. Acesse **Storage**.
2. Clique em **Create Bucket**.
3. Crie o bucket utilizado pela aplicação.
4. Defina as configurações de visibilidade como públicas.

O nome do bucket deve ser utilizado na variável:

```env
AWS_STORAGE_BUCKET_NAME=nome-do-bucket
```

### Obter as credenciais do Storage

No Supabase, acesse as configurações do **Storage** e localize as credenciais da API compatível com S3.

Essas informações serão utilizadas nas variáveis:

```env
SUPABASE_S3_ENDPOINT=
SUPABASE_S3_ACCESS_KEY=
SUPABASE_S3_SECRET_KEY=
SUPABASE_S3_REGION=
```

## 5. Configurar as variáveis de ambiente

Crie um arquivo `.env` na pasta do backend:

```env
SECRET_KEY=sua-secret-key-do-django

DATABASE_URL=sua-database-url

SUPABASE_S3_ENDPOINT=seu-s3-endpoint
SUPABASE_S3_ACCESS_KEY=sua-access-key
SUPABASE_S3_SECRET_KEY=sua-secret-key
SUPABASE_S3_REGION=sua-regiao

SUPABASE_URL=https://seu-project-reference-id.supabase.co

AWS_STORAGE_BUCKET_NAME=nome-do-bucket
```

### SUPABASE_URL e Project Reference ID

A variável `SUPABASE_URL` utiliza o **Project Reference ID** do projeto Supabase.

No painel do Supabase:

1. Acesse o projeto.
2. Abra **Project Settings**.
3. Procure pelo **Reference ID** do projeto.
4. Use esse valor para montar a URL:

```text
https://SEU_REFERENCE_ID.supabase.co
```

Por exemplo, se o Reference ID for:

```text
dcefteyhncexsodfcvmk
```

a variável será:

```env
SUPABASE_URL=https://dcefteyhncexsodfcvmk.supabase.co
```

O **Project Reference ID é específico de cada projeto Supabase**. Portanto, ao configurar o projeto em outro ambiente ou criar um novo projeto, utilize o Reference ID correspondente àquele projeto.

### DATABASE_URL

A conexão com o PostgreSQL deve utilizar uma conexão **IPv4**.

No Supabase, utilize o **Session Pooler** para obter os dados da conexão.

A URL terá um formato semelhante a:

```env
DATABASE_URL=postgresql://usuario:senha@host:5432/database
```

Utilize os dados fornecidos pelo Supabase para o seu projeto.

### Supabase Storage

As variáveis relacionadas ao Storage são:

```env
SUPABASE_S3_ENDPOINT=seu-s3-endpoint
SUPABASE_S3_ACCESS_KEY=sua-access-key
SUPABASE_S3_SECRET_KEY=sua-secret-key
SUPABASE_S3_REGION=sua-regiao
AWS_STORAGE_BUCKET_NAME=nome-do-bucket
```

`AWS_STORAGE_BUCKET_NAME` deve ser exatamente o nome do bucket criado no Supabase.

O `SUPABASE_URL` deve utilizar o **Reference ID do projeto**, por exemplo:

```env
SUPABASE_URL=https://dcefteyhncexsodfcvmk.supabase.co
```

## 6. Executar as migrações

```bash
python manage.py migrate
```

## 7. Criar um superusuário

```bash
python manage.py createsuperuser
```

## 8. Executar o servidor

```bash
python manage.py runserver
```

O backend estará disponível em:

```text
http://127.0.0.1:8000/
```

## Variáveis de ambiente

| Variável                  | Utilização                           |
| ------------------------- | ------------------------------------ |
| `SECRET_KEY`              | Chave secreta do Django              |
| `DATABASE_URL`            | Conexão com o PostgreSQL do Supabase |
| `SUPABASE_S3_ENDPOINT`    | Endpoint S3 do Supabase Storage      |
| `SUPABASE_S3_ACCESS_KEY`  | Chave de acesso S3                   |
| `SUPABASE_S3_SECRET_KEY`  | Chave secreta S3                     |
| `SUPABASE_S3_REGION`      | Região do Storage                    |
| `SUPABASE_URL`            | URL do projeto Supabase              |
| `AWS_STORAGE_BUCKET_NAME` | Nome do bucket do Supabase Storage   |
