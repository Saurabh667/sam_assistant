from django.http import HttpResponse
from django.shortcuts import render,redirect
import speech_recognition as sr
import webbrowser
import pyttsx3
# import music_library
import requests
from openai import OpenAI
from datetime import datetime
import pyjokes
import wikipedia
import openai
import tkinter as tk
import os
import smtplib
from email.message import EmailMessage
import pyaudio

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def home(request):
    # if __name__ == '__main__':
    # speak('initialising sam........ you assistant is activated')
    # while True:
    #     r=sr.Recognizer()
    #     try:
    #         with sr.Microphone() as source:
    #             print('listening....')
    #             audio = r.listen(source,timeout=3, phrase_time_limit=9)
    #             print("Recognizing...")
    #             text = r.recognize_google(audio)
    #     except Exception as e:
    #         print(f"Could not request results; {e}")
    return render(request,'home.html')