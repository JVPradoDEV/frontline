import os
from storages.backends.s3 import S3Storage
from dotenv import load_dotenv

load_dotenv()


class SupabaseStorage(S3Storage):

    def url(self, name, parameters=None, expire=None, http_method=None):
        return f"{os.environ.get('SUPABASE_URL')}/storage/v1/object/public/{self.bucket_name}/{name}"