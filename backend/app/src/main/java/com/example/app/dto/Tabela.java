import java.util.Vector;

class Tabela{
  Integer qtde_coluna;
  Integer qtde_elementos;
  Vector<String> colunas = new Vector<String>();

  Tabela(Vector<Coluna> colunas){
    this.qtde_coluna = colunas.size();
    this.qtde_elementos = 0;

    if(colunas.size() != 0 ){
      for(Coluna c: colunas){
        this.qtde_elementos += c.tamanho;
      }
    }

  }
}
