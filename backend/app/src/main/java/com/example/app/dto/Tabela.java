package com.example.app.dto;

import java.util.Vector;
import java.util.Hashtable;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Tabela{
  public Vector<Hashtable<String, String>> dados;
  public Hashtable<String, String> colunas;

  public Tabela(Vector<Coluna> old_colunas){
    dados = new Vector<Hashtable<String, String>>();
    colunas = new Hashtable<String, String>() ;
    Coluna objetoPosicao = old_colunas.get(0);
    this.dados.ensureCapacity(objetoPosicao.tamanho);
    int newSize= objetoPosicao.tamanho;
    // Adicione novos elementos ao vetor se necessário
    while (this.dados.size() < newSize) {
      this.dados.add(new Hashtable<String,String>()); // Adicione uma nova Hashtable vazia
    }

    for(Coluna c: old_colunas){
      int count = 0;
      String titulo = c.titulo;
      Boolean eNumerico = c.eNumerico;
      String tipo = c.tipo;

      this.colunas.put(titulo, tipo);

      for(String d: c.dados){
        Hashtable<String, String> objetoPosicaoDados = this.dados.get(count);
        objetoPosicaoDados.put(c.titulo, d);
        count += 1;
      }

    }
  }
  @JsonProperty("dados")
  Vector<Hashtable<String, String>> getDados(){
    return this.dados;
  }
  @JsonProperty("colunas")
  Hashtable<String, String> getColunas(){
    return this.colunas;
  }

}