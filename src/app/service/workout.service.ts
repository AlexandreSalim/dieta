import { Injectable } from '@angular/core';

export type NivelTreino = 'iniciante' | 'intermediario' | 'avancado' | 'expert' | 'elite';
export type CategoriaIMC = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | 'EXG';
export type ModeloAlimentar = 'tradicional' | 'lowcarb' | 'cetogenico';
export type Objetivo = 'perder' | 'manter' | 'ganhar';

interface Cardapio {
  [key: string]: string[]; // Modelos alimentares
}

export interface Refeicao {
  titulo: string;
  itens: string[];
}


interface Treino {
  nivel: number;
  video: string;
  descricao: string;
  calorias: number;
}

export interface DietaPayload {
  modelo: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  cardapio: Refeicao[][];
  nivelTreino: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  getTreinos(nivel: NivelTreino): Treino[] {
    const TREINOS: Record<NivelTreino, Treino[]> = {
      iniciante: this.gerarTreinos(1, 'Iniciante'),
      intermediario: this.gerarTreinos(2, 'Intermediário'),
      avancado: this.gerarTreinos(3, 'Avançado'),
      expert: this.gerarTreinos(4, 'Expert'),
      elite: this.gerarTreinos(5, 'Elite')
    };
    
    return TREINOS[nivel] || [];
  }

  getCardapio(
    categoria: CategoriaIMC, 
    objetivo: Objetivo, 
    modelo: ModeloAlimentar
  ): Refeicao[][] {

    const CARDAPIOS: Record<CategoriaIMC, {
      [key in Objetivo]: {
        [key in ModeloAlimentar]: Record<number, Refeicao[]>;
      }
    }> = {
      PP: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      P: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      M: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      G: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      GG: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      XG: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
      EXG: { 
        perder: {
          tradicional: {
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            
          },
          lowcarb: {
            // 1100: ['PP Perder LowCarb 1000: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum'],
            // 1000: ['PP Perder LowCarb 1100: Café: Ovos + Bacon', 'Almoço: Frango + Brócolis', 'Jantar: Salada com Atum']
          },
          cetogenico: {
            // 900: ['PP Perder Cetogenico 1000: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo'],
            // 800: ['PP Perder Cetogenico 1100: Café: Ovos + Queijo', 'Almoço: Carne + Espinafre', 'Jantar: Omelete de queijo']
          }
        },
        manter: {
          tradicional: {
            1500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          lowcarb: {
            1300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1200: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          },
          cetogenico: {
            1100: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            1000: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          }
        },
        ganhar: {
          tradicional: {
            2800: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2700: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          lowcarb: {
            2600: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2500: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
          },
          cetogenico: {
            2400: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ],
            2300: [
              {
                titulo: 'Café da Manhã',
                itens: [
                  'Ovos mexidos com queijo e azeite',
                  'Café sem açúcar ou 1 punhado de castanhas'
                ]
              },
              {
                titulo: 'Lanche da Manhã',
                itens: ['Meio abacate com limão e chia']
              },
              {
                titulo: 'Almoço',
                itens: [
                  'Filé de frango grelhado com azeite',
                  'Salada de folhas verdes e tomate',
                  'Brócolis cozido no vapor'
                ]
              },
              {
                titulo: 'Lanche da Tarde',
                itens: ['Queijo + 1 punhado de amêndoas']
              },
              {
                titulo: 'Jantar',
                itens: [
                  'Peixe assado com manteiga e ervas',
                  'Couve refogada no azeite',
                  'Creme de espinafre'
                ]
              }
            ]
          }
        }
      },
    };

    // Retorna todas as dietas disponíveis para a combinação escolhida,
    // concatenando os arrays de todas as faixas calóricas.
    const dietasPorCaloria = CARDAPIOS[categoria]?.[objetivo]?.[modelo];
    if (!dietasPorCaloria) {
      return [];
    }
    return Object.values(dietasPorCaloria);

    // return Object.values(dietasPorCaloria).reduce((acc, curr) => acc.concat(curr), []);
  }
  

  constructor() { }

  private gerarTreinos(nivel: number, dificuldade: string): Treino[] {
    return Array(20).fill(null).map((_, i) => ({
      nivel: nivel,
      video: `https://youtu.be/treino-${nivel}-${i + 1}`,
      descricao: `Treino ${dificuldade} ${i + 1} - 6min aquecimento + 3 blocos de 8min`,
      calorias: 500 + (nivel * 100) + (i * 10)
    }));
  }


  ///////teste/////
  private dieta?: DietaPayload;

  setDieta(payload: DietaPayload) {
    this.dieta = payload;
  }

  getDieta(): DietaPayload {
    if (!this.dieta) throw new Error('Dieta não definida');
    return this.dieta;
  }

  clear() {
    this.dieta = undefined;
  }
}