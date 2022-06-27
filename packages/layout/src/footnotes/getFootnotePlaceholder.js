function getFootnotePlaceholder(node) {
  if (node.props?.renderFootnotes) {
    return node;
  }

  if (node.children)
    for (const child of node.children) {
      const placeholder = getFootnotePlaceholder(child);
      if (placeholder) return placeholder;
    }

  return null;
}

export default getFootnotePlaceholder;
