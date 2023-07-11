package com.example.app.models;

import lombok.Data;

import java.util.List;

@Data
public class Column {
    private String title;
    private List<String> data;
    private Boolean numericData;

    public Boolean getNumericData() {
        for (var dat :
                this.getData()) {
            try {
                Double.parseDouble(dat);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        return true;
    }

//  public Column(String titulo, Vector<String> dados){
//    this.title = titulo;
//    this.dados = dados;
//    this.eNumeric = true;
//    this.tamanho = dados.size();
//
//    for(String str: dados){
//      if(!this.testeNumerico(str)){
//        this.eNumerico = false;
//        break;
//      }
//    }
//
//  }
//
//  Boolean testeNumerico(String strNum) {
//    if (strNum == null) {
//        return false;
//    }
//
//    try {
//      double d = Double.parseDouble(strNum);
//
//    } catch (Exception e) {
//      return false;
//
//    }
//
//    return true;
//  }
}
