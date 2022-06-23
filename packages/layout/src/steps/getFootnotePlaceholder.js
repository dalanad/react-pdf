function getFootnotePlaceholder(node) {
  if (node.props?.renderFootnotes) {
    return node;
  }

  if (node.children)
    // eslint-disable-next-line no-restricted-syntax
    for (const child of node.children) {
      const x = getFootnotePlaceholder(child);
      if (x) return x;
    }

  return null;
}

export default getFootnotePlaceholder;
