class FeatureRegistry {
  private featureSet = new Set<string>();

  registerFeature(feature: string): void {
    this.featureSet.add(feature);
  }

  hasFeature(feature: string): boolean {
    return this.featureSet.has(feature);
  }
}

export const featureRegistry = new FeatureRegistry();
