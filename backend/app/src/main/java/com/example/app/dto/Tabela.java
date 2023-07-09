package com.example.app.dto;

import java.util.Vector;
import java.util.Hashtable;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Tabela{
  Vector<Hashtable<String, String>> dados;
  Hashtable<String, String> colunas;

  public Tabela(Vector<Coluna> old_colunas){
    int newSize = 0; // Novo tamanho desejado
    Coluna objetoPosicao = old_colunas.get(0);

    newSize = objetoPosicao.tamanho;

    for(Coluna c: old_colunas){
      if(newSize < c.tamanho){
        newSize = c.tamanho;
      }
    }

    this.dados.ensureCapacity(newSize);

    // Adicione novos elementos ao vetor se necessário
    while (this.dados.size() < newSize) {
        this.dados.add(new Hashtable<String,String>()); // Adicione uma nova Hashtable vazia
    }

    for(Coluna c: old_colunas){
      int count = 0;
      String titulo = c.titulo;
      Boolean eNumerico = c.eNumerico;
      String tipo;

      if(eNumerico){
        tipo = "float";
      }else{
        tipo = "string";
      }

      this.colunas.put(titulo, tipo);

      for(String d: c.dados){
        Hashtable<String, String> objetoPosicaoDados = this.dados.get(count);
        objetoPosicaoDados.put(c.titulo, d);
      }
      count += 1;
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
