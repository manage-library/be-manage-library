import { JwtGuard } from '@src/guards/jwt.guard';
import { GetTransactionDto } from './dto/transaction.dto';
import { RolesGuard } from '@src/guards/role.guard';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/common/decorators/roles.decorator';
import { ERole } from '@src/common/enums';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  @Roles([ERole.ADMIN])
  @UseGuards(RolesGuard)
  getAllTransaction(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: GetTransactionDto,
  ) {
    const { userId, vipId, status } = query;
    console.log({ userId, vipId, status }, query);
    return this.transactionService.getAll({ userId, vipId, status });
  }
}
