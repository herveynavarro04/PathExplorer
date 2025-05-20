import axios, { AxiosInstance } from 'axios';
import { ProjectRecomendationsRequestDto } from '../dto/request/projectRecomendations.request.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { MsAgentResponse } from '../dto/response/msAgent.response.dto';

export class AgentRepository {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.MS_AGENT_HELPER,
      timeout: 5000,
    });
  }

  async agentProjectRecomendations(
    payload: ProjectRecomendationsRequestDto,
  ): Promise<MsAgentResponse> {
    try {
      const response = await this.httpClient.post(
        '/api/agent/recommend',
        payload,
      );
      Logger.log(
        'Project recomendations succesfully requested',
        'AgentRepository',
      );
      return response.data;
    } catch (error) {
      Logger.error('Error on MsAgent request', error.stack, 'AgentRepository');
      throw new InternalServerErrorException('Failed to request projects');
    }
  }
}
