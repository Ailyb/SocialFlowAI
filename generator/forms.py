
from django import forms

class PostForm(forms.Form):
    topic = forms.CharField(label="Topic", max_length=200)
    tone = forms.CharField(label="Tone", max_length=100)
