package com.example.app.dto;

import java.util.Vector;

class Coluna{
  String titulo;
  Boolean eNumerico;
  Integer tamanho;
  Vector<String> dados = new Vector<String>();

  Coluna(String titulo, Vector<String> dados){
    this.titulo = titulo;
    this.dados = dados;
    this.eNumerico = true;
    this.tamanho = dados.size();
    
    for(String str: dados){
      if(!this.testeNumerico(str)){
        this.eNumerico = false;
        break;
      }
    }

  }

  Boolean testeNumerico(String strNum) {
    if (strNum == null) {
        return false;
    }

    try {
      double d = Double.parseDouble(strNum);

    } catch (Exception e) {
      return false;

    }

    return true;
  }
}
