package com.example.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Vector;

public class Coluna{
  public  String titulo;
  public  Boolean eNumerico;
  public  Integer tamanho;
  public  String tipo;
  public  Vector<String> dados = new Vector<String>();

  public  Coluna(String titulo, Vector<String> dados){
    boolean todasVazias = true;

    for (String str : dados) {
      if (!str.isEmpty()) {
        todasVazias = false;
        break;
      }
    }

    if(todasVazias){
      this.titulo = titulo;
      this.dados = dados;
      this.eNumerico = false;
      this.tipo = "string";
      this.tamanho = dados.size();
      return;
    }

    this.titulo = titulo;
    this.dados = dados;
    this.eNumerico = true;
    this.tipo = "int";
    this.tamanho = dados.size();

    for(String str: dados){
      if(!this.testeNumerico(str)){
        this.eNumerico = false;
        this.tipo = "string";

        break;
      }

      if(!this.testeInt(str) && this.eNumerico){
        this.tipo = "float";
      }
    }

  }

  Boolean testeNumerico(String strNum) {
    if (strNum == null) {
      return false;
    }

    if(strNum != ""){
      try {
        double d = Double.parseDouble(strNum);


      } catch (Exception e) {
        return false;
      }
    }

    return true;
  }

  Boolean testeInt(String strNum){
    if(strNum != ""){
      try{
        int intValue = Integer.parseInt(strNum);
      }catch(Exception e){
        return false;
      }
    }

    return true;
  }

  @JsonProperty("titulo")
  public String getTitulo() {
    return titulo;
  }

  @JsonProperty("eNumerico")
  public Boolean getENumerico() {
    return eNumerico;
  }

  @JsonProperty("tamanho")
  public Integer getTamanho() {
    return tamanho;
  }

  @JsonProperty("dados")
  public Vector<String> getDados() {
    return dados;
  }

  @JsonProperty("tipo")
  public String getTipo() {
    return tipo;
  }
}