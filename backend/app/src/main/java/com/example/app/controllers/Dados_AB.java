package com.example.app.controllers;

import java.util.Hashtable;
import java.lang.Math;
import static java.util.Collections.sort;

public abstract class Dados_AB{
  abstract void calcular();
}

class Dados extends Dados_AB{
  void calcular(){
    System.out.println("CALCULAR DADOS");
  }
}

abstract class Transformador extends Dados_AB{
  Dados_AB dado_inicial;

  Transformador(Dados_AB dado_inicial){
    this.dado_inicial = dado_inicial;
  }

  void calcular(){
    this.dado_inicial.calcular();
  }
}

class Dados_Numericos extends Transformador{
  Dados_AB dado_inicial;

  Double media = 0.0;
  Double mediana = 0.0;
  Double moda = 0.0;
  Double quartil_1 = 0.0, quartil_3 = 0.0;
  Double desvio_padrao_amostral = 0.0, desvio_padrao_populacional = 0.0;
  Double varianca_populacional = 0.0, varianca_amostral = 0.0;
  Double coeficiente_variacao = 0.0;
  Double maximo = 0.0;
  Double minimo = 0.0;
  Double amplitude = 0.0;

  Dados_Numericos(Dados_AB dado_inicial, Coluna coluna){
    super(dado_inicial);
    this.dado_inicial = dado_inicial;
    this.calcular(coluna);
  }

  void calcular(Coluna coluna){
    this.dado_inicial.calcular();
    this.calcular_numerico(coluna);
  }

  void calcular_numerico(Coluna coluna){
    System.out.println("CALCULAR DADOS NUMERICOS");

    Integer size = coluna.tamanho;

    if(size == 0){
      return;
    }

    sort(coluna.dados);

    // MEDIA E MODA ======================================================
    Hashtable<String, Integer> aux_moda = new Hashtable<String, Integer>();
    Integer max = 1;
    String str_max = coluna.dados.get(0);

    for(String dado: coluna.dados){
      media += Double.parseDouble(dado);

      //MODA
      if(aux_moda.containsKey(dado)){
        if(aux_moda.get(dado) + 1 > max){
          aux_moda.put(dado, aux_moda.get(dado) + 1);

          max = aux_moda.get(dado);
          str_max = dado;
        }else{
          aux_moda.put(dado, aux_moda.get(dado) + 1);
        }
      }else{
        aux_moda.put(dado, 1);
      }
    }

    media = media/size;
    moda = Double.parseDouble(str_max);

    //MEDIANA, QUARTIL_1, QUARTIL_2 ======================================================
    Double posicao_m, posicao_q1, posicao_q3;
    Double size_n = size.doubleValue();

    posicao_m = (size_n/2) - 1;
    posicao_q1 = (size_n/4) - 1;
    posicao_q3 = ((3*size_n)/4) - 1;

    if(posicao_m != posicao_m.intValue()){
      mediana = Double.parseDouble(coluna.dados.get(posicao_m.intValue() + 1));

    }else{
      int z = posicao_m.intValue();
      mediana = (Double.parseDouble(coluna.dados.get(z)) + Double.parseDouble(coluna.dados.get(z + 1)))/2;
    }

    if(size >= 4){
      if(size % 4 != 0){
        quartil_1  = Double.parseDouble(coluna.dados.get(posicao_q1.intValue() + 1));

      }else{
        int z = posicao_q1.intValue();
        quartil_1 = (Double.parseDouble(coluna.dados.get(z)) + Double.parseDouble(coluna.dados.get(z + 1)))/2;

      }

      if(size % 4 != 0){
        quartil_3  = Double.parseDouble(coluna.dados.get(posicao_q3.intValue() + 1));

      }else{
        int z = posicao_q3.intValue();
        quartil_3 = (Double.parseDouble(coluna.dados.get(z)) + Double.parseDouble(coluna.dados.get(z + 1)))/2;

      }
    }


    // DESVIO_PADRAO, VARIANCA, COEFICIENTE VARIACAO =======================

    Double varianca_soma = 0.0, cv_soma = 0.0;

    for(String dado: coluna.dados){
      Double d = Double.parseDouble(dado);

      varianca_soma += Math.pow(d - this.media, 2);
    }

    varianca_amostral = varianca_soma/(size-1);
    varianca_populacional = varianca_soma/size;

    desvio_padrao_amostral = Math.sqrt(varianca_amostral);
    desvio_padrao_populacional = Math.sqrt(varianca_populacional);

    coeficiente_variacao = desvio_padrao_amostral*100/media;


    // Máximo, Minimo, amplitude =======================

    maximo = Double.parseDouble(coluna.dados.get(0));
    minimo = Double.parseDouble(coluna.dados.get(0));

    for(String dado: coluna.dados){
      Double d = Double.parseDouble(dado);

      if(maximo < d){
        maximo = d;
      }

      if(minimo > d){
        minimo = d;
      }
    }

    amplitude = maximo - minimo;
  }
}

class Dados_Nao_Numericos extends Transformador{
  Dados_AB dado_inicial;
  String moda;


  Dados_Nao_Numericos(Dados_AB dado_inicial, Coluna coluna){
    super(dado_inicial);
    this.dado_inicial = dado_inicial;
    this.calcular(coluna);
  }

  void calcular(Coluna coluna){
    this.dado_inicial.calcular();
    this.calcular_nao_numerico(coluna);
    //CALCULAR DADOS NÃO NUMERICOS
  }

  void calcular_nao_numerico(Coluna coluna){
    System.out.println("CALCULAR DADOS NUMERICOS");

    if(coluna.tamanho == 0){
      return;
    }

    Hashtable<String, Integer> aux_moda = new Hashtable<String, Integer>();
    Integer max = 1;
    String str_max = coluna.dados.get(0);

    for(String dado: coluna.dados){

      if(aux_moda.containsKey(dado)){
        if(aux_moda.get(dado) + 1 > max){
          aux_moda.put(dado, aux_moda.get(dado) + 1);

          max = aux_moda.get(dado);
          str_max = dado;
        }else{
          aux_moda.put(dado, aux_moda.get(dado) + 1);
        }
      }else{
        aux_moda.put(dado, 1);
      }
    }

    moda = str_max;
  }
}
