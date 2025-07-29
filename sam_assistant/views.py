from django.http import HttpResponse
from django.shortcuts import render,redirect
import speech_recognition as sr
import webbrowser
import pyttsx3
import requests
from openai import OpenAI
from datetime import datetime
import pyjokes
import wikipedia
import openai
import os
import pyaudio
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random

# CHATGPT SUPPORTING APIs
tokens=[
    os.environ.get("GITHUB_TOKEN_1"),
    os.environ.get("GITHUB_TOKEN_2"),
    os.environ.get("GITHUB_TOKEN_3"),
    os.environ.get("GITHUB_TOKEN_4"),
    os.environ.get("GITHUB_TOKEN_5"),
    os.environ.get("GITHUB_TOKEN_6"),
    os.environ.get("GITHUB_TOKEN_7"),
    os.environ.get("GITHUB_TOKEN_8"),
    os.environ.get("GITHUB_TOKEN_9"),
    os.environ.get("GITHUB_TOKEN_10"),
    os.environ.get("GITHUB_TOKEN_11"),
    os.environ.get("GITHUB_TOKEN_12"),
    os.environ.get("GITHUB_TOKEN_13"),
    os.environ.get("GITHUB_TOKEN_14"),
    os.environ.get("GITHUB_TOKEN_15"),
    os.environ.get("GITHUB_TOKEN_16"),
]
load_dotenv()
token = random.choice([t for t in tokens if t])
# token = os.environ.get("GITHUB_TOKEN")
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
client = OpenAI(
    base_url=endpoint,
    api_key=token,
)
def aiProcess(command):
    
    response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "you are a virtual helpful voice assistant named sam and you have to assist in 2,3 lines",
        },
        {
            "role": "user",
            "content": command,
        }
    ],
    temperature=1,
    top_p=1,
    model=model
    )
    return  response.choices[0].message.content
@csrf_exempt  # disable CSRF for simplicity (only for dev/test)
def call_ai(request):
    if request.method == "POST":
        data = json.loads(request.body)
        command = data.get("command", "")
        result = aiProcess(command)
        return JsonResponse({"response": result})
    return JsonResponse({"error": "POST request only"}, status=405)
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def home(request):
    
    return render(request,'home.html')
