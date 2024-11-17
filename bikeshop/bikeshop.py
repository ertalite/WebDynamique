from flask import Flask
import os
import json
import vitrine

def velo_dispo()->list[str]:
       Descr_dispo = {}
       for code in getInvent():
              if len(getInvent()[code]) > 0 :
                     Descr_dispo[code] = getDescr()[code]

       return Descr_dispo

def getDescr()->dict[str, list[str]]:
       with open("static/data/descr.json", "r") as p:
              return json.load(p)

def getInvent()->list[int]:
       with open("static/data/invent.json", "r") as p:
              return json.load(p)

def achat_velo(code:str)->None:
       invent = getInvent()
       if len(invent[code]) == 0 :
              del invent[code][-1]
              with open("static/data/invent.json", "w") as p:
                     json.dump(invent, p)

def ajout_velo(code:str)->None:
       invent = getInvent()
       invent[code].append(invent[code][-1]+1)
       with open("static/data/invent.json", "w") as p:
              json.dump(invent, p)
