
from django.db import models

class Post(models.Model):
    topic = models.CharField(max_length=200)
    tone = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.topic

