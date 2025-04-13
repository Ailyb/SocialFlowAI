
from django import forms

class PostForm(forms.Form):
    topic = forms.CharField(label="Topic", max_length=200)
    tone = forms.CharField(label="Tone", max_length=100)
    max_length = forms.IntegerField(
        label="Maximum Post Length",
        initial=250,
        min_value=100,
        max_value=3000,
        widget=forms.NumberInput(attrs={'type': 'range', 'class': 'form-range'})
    )

