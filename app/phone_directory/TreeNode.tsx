import React from 'react';

type TreeNodeProps = {
  node: any;
  searchNumber?: string;
};

interface TreeNodePropsWithType extends TreeNodeProps {
  childType?: 'left' | 'right' | null;
}

const TreeNode: React.FC<TreeNodePropsWithType> = ({
  node,
  searchNumber,
  childType = null,
}) => {
  if (!node) return null;

  // highlight if searchNumber matches nodes.mobile
  const isMatch = searchNumber && node.mobile === searchNumber;

  // Assign color class based on childType
  let colorClass = '';
  if (childType === 'left') colorClass = 'left-child';
  if (childType === 'right') colorClass = 'right-child';

  return (
    <div className="tree-node-container">
      <div className={`tree-node${isMatch ? ' highlight' : ''}`}>
        <div className={`tree-node-content ${colorClass}`}>
          <div>
            <strong>{node.name}</strong>
          </div>
          <div>{node.mobile}</div>
        </div>
        <div className="tree-children">
          {node.left && (
            <div className="tree-child left">
              <TreeNode
                node={node.left}
                searchNumber={searchNumber}
                childType="left"
              />
            </div>
          )}
          {node.right && (
            <div className="tree-child right">
              <TreeNode
                node={node.right}
                searchNumber={searchNumber}
                childType="right"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
