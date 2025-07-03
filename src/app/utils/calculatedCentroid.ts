import { ICoord } from '../interfaces/coord.interface';
import { IClusterResult } from '../interfaces/cluster-result.interface';

/**
 * Agrupa pontos em K clusters usando k-means aproximado.
 * Retorna cada cluster com centroide + raio.
 */
export function calculateNClusters(points: ICoord[], k: number): IClusterResult[] {
  if (points.length === 0 || k <= 0) return [];

  // Passo 1: inicializar centróides aleatórios
  const centroids: ICoord[] = [];
  for (let i = 0; i < k; i++) {
    centroids.push(points[Math.floor(Math.random() * points.length)]);
  }

  let clusters: ICoord[][] = [];
  let changed = true;
  let iterations = 0;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const MAX_ITER = 100;

  while (changed && iterations < MAX_ITER) {
    clusters = Array.from({ length: k }, () => []);
    changed = false;

    // Passo 2: atribuir pontos ao centróide mais próximo
    for (const p of points) {
      let closest = 0;
      let minDist = distance(p, centroids[0]);

      for (let i = 1; i < k; i++) {
        const d = distance(p, centroids[i]);
        if (d < minDist) {
          closest = i;
          minDist = d;
        }
      }
      clusters[closest].push(p);
    }

    // Passo 3: recalcular centróides
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) continue; // skip cluster vazio
      const newCenter = meanCenter(clusters[i]);
      if (distance(newCenter, centroids[i]) > 0.0001) {
        changed = true;
      }
      centroids[i] = newCenter;
    }

    iterations++;
  }
  // Passo 4: calcular raio de cada cluster
  const results: IClusterResult[] = [];
  for (let i = 0; i < k; i++) {
    const members = clusters[i];
    if (members.length === 0) continue;
    const center = centroids[i];
    const dists = members.map((p) => distance(p, center));
    const avgDist = dists.reduce((a, b) => a + b, 0) / dists.length;
    const radius = avgDist * 111_000 * 2 + members.length * 5;
    const classify = 0;
    const id = i + 1;

    results.push({
      id,
      center,
      radius,
      members,
      classify,
    });
  }

  //Ordena por quantidade de ocorrencias/menbros totais que pertencem ao cluster
  results.sort((x) => x.members.length);

  //Define a classificação de acordo com a ordem (baixo, medio e alto) = o que vai definir a cor na platagem do grafico
  let classificacao = 1;
  results.forEach((cluster) => {
    cluster.classify = classificacao++;
  });

  return results;
}

function meanCenter(points: ICoord[]): ICoord {
  const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
  const lng = points.reduce((s, p) => s + p.lng, 0) / points.length;
  return { lat, lng };
}

function distance(a: ICoord, b: ICoord): number {
  const latDiff = a.lat - b.lat;
  const lngDiff = a.lng - b.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}
