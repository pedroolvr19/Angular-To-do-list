

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Filtro = 'todas' | 'ativas' | 'concluidas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  novaTarefa: string = '';
  filtro: Filtro = 'todas';

  tarefas: any[] = [
    { nome: 'Corrigir o bug do filtro', concluida: true, dataConclusao: '2025-09-08', estado: 'visivel' },
    { nome: 'Adicionar animação de saída', concluida: false, dataConclusao: null, estado: 'visivel' },
  ];

  get tarefasFiltradas() {
    if (this.filtro === 'ativas') {
      return this.tarefas.filter(tarefa => !tarefa.conclida);
    } else if (this.filtro === 'concluidas') {
      return this.tarefas.filter(tarefa => tarefa.conclida);
    }
    return this.tarefas;
  }

  get itensRestantes() {
    return this.tarefas.filter(tarefa => !tarefa.conclida).length;
  }

  adicionarTarefa() {
    if (this.novaTarefa.trim() !== '') {
      this.tarefas.unshift({
        nome: this.novaTarefa,
        conclida: false,
        dataConclusao: null,
        estado: 'visivel' 
      });
      this.novaTarefa = '';
    }
  }


  removerTarefa(tarefaParaRemover: any) {
    tarefaParaRemover.estado = 'removendo'; 

   
    setTimeout(() => {
      this.tarefas = this.tarefas.filter(tarefa => tarefa !== tarefaParaRemover);
    }, 300);
  }

  toggleConclusao(tarefa: any) {
    tarefa.conclida = !tarefa.conclida;
    if (tarefa.conclida) {
      tarefa.dataConclusao = new Date().toISOString().split('T')[0];
    } else {
      tarefa.dataConclusao = null;
    }
  }

  definirFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }
  
  limparConcluidas() {
   
    this.tarefas.forEach(tarefa => {
      if (tarefa.conclida) {
        tarefa.estado = 'removendo';
      }
    });
    
 
    setTimeout(() => {
      this.tarefas = this.tarefas.filter(tarefa => !tarefa.conclida);
    }, 300);
  }
}