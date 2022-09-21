import { gql } from '@apollo/client';

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: SkillInput!) {
    createSkill(skill: $skill) {
      id
      name
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $skill: SkillInput!) {
    updateSkill(id: $id, skill: $skill) {
      id
      name
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      affected
    }
  }
`;
