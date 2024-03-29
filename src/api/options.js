const kint = {
  "types": [
    {
      "minmax": [
        0,
        null
      ],
      "types": {
        "BalanceWrapper": {
          "amount": "String"
        },
        "CurrencyId": {
          "_enum": {
            "Token": "TokenSymbol",
            "ForeignAsset": "ForeignAssetId"
          }
        },
        "InterbtcPrimitivesCurrencyId": {
          "_enum": {
            "Token": "InterbtcPrimitivesTokenSymbol",
            "ForeignAsset": "InterbtcForeignAssetId"
          }
        },
        "InterbtcForeignAssetId": "u32",
        "ForeignAssetId": "u32",
        "FundAccountJsonRpcRequest": {
          "account_id": "AccountId",
          "currency_id": "InterbtcPrimitivesCurrencyId"
        },
        "H256Le": "H256",
        "SignedFixedPoint": "FixedU128",
        "TokenSymbol": {
          "_enum": {
            "DOT": 0,
            "IBTC": 1,
            "INTR": 2,
            "KSM": 10,
            "KBTC": 11,
            "KINT": 12
          }
        },
        "InterbtcPrimitivesTokenSymbol": {
          "_enum": {
            "DOT": 0,
            "IBTC": 1,
            "INTR": 2,
            "KSM": 10,
            "KBTC": 11,
            "KINT": 12
          }
        },
        "UnsignedFixedPoint": "FixedU128",
        "VaultCurrencyPair": {
          "collateral": "CurrencyId",
          "wrapped": "CurrencyId"
        },
        "VaultId": {
          "account_id": "AccountId",
          "currencies": "VaultCurrencyPair"
        }
      }
    }
  ],
  "rpc": {
    "btcRelay": {
      "verifyBlockHeaderInclusion": {
        "description": "Verify that the block with the given hash is included",
        "params": [
          {
            "name": "block_hash",
            "type": "H256Le"
          }
        ],
        "type": "void"
      }
    },
    "escrow": {
      "balanceAt": {
        "description": "Get a given user's escrowed balance",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          },
          {
            "name": "height",
            "type": "Option<BlockNumber>"
          }
        ],
        "type": "BalanceWrapper"
      },
      "totalSupply": {
        "description": "Get the total voting supply in the system",
        "params": [
          {
            "name": "height",
            "type": "Option<BlockNumber>"
          }
        ],
        "type": "BalanceWrapper"
      }
    },
    "issue": {
      "getIssueRequests": {
        "description": "Get all issue request IDs for a particular account",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      },
      "getVaultIssueRequests": {
        "description": "Get all issue request IDs for a particular vault",
        "params": [
          {
            "name": "vault_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      }
    },
    "oracle": {
      "collateralToWrapped": {
        "description": "Collateral to Wrapped exchange rate",
        "params": [
          {
            "name": "amount",
            "type": "BalanceWrapper"
          },
          {
            "name": "currency_id",
            "type": "CurrencyId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "wrappedToCollateral": {
        "description": "Wrapped to Collateral exchange rate",
        "params": [
          {
            "name": "amount",
            "type": "BalanceWrapper"
          },
          {
            "name": "currency_id",
            "type": "CurrencyId"
          }
        ],
        "type": "BalanceWrapper"
      }
    },
    "redeem": {
      "getRedeemRequests": {
        "description": "Get all redeem request IDs for a particular account",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      },
      "getVaultRedeemRequests": {
        "description": "Get all redeem request IDs for a particular vault",
        "params": [
          {
            "name": "vault_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      }
    },
    "refund": {
      "getRefundRequests": {
        "description": "Get all refund request IDs for a particular account",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      },
      "getRefundRequestsByIssueId": {
        "description": "Get all refund request IDs for a particular issue ID",
        "params": [
          {
            "name": "issue_id",
            "type": "H256"
          }
        ],
        "type": "H256"
      },
      "getVaultRefundRequests": {
        "description": "Get all refund request IDs for a particular vault",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      }
    },
    "replace": {
      "getNewVaultReplaceRequests": {
        "description": "Get all replace request IDs to a particular vault",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      },
      "getOldVaultReplaceRequests": {
        "description": "Get all replace request IDs from a particular vault",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<H256>"
      }
    },
    "reward": {
      "computeEscrowReward": {
        "description": "Get a given user's rewards due",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          },
          {
            "name": "currency_id",
            "type": "CurrencyId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "computeVaultReward": {
        "description": "Get a given vault's rewards due",
        "params": [
          {
            "name": "vault_id",
            "type": "VaultId"
          },
          {
            "name": "currency_id",
            "type": "CurrencyId"
          }
        ],
        "type": "BalanceWrapper"
      }
    },
    "vaultRegistry": {
      "getCollateralizationFromVault": {
        "description": "Returns the collateralization of a specific vault",
        "params": [
          {
            "name": "vault",
            "type": "VaultId"
          },
          {
            "name": "only_issued",
            "type": "bool"
          }
        ],
        "type": "UnsignedFixedPoint"
      },
      "getCollateralizationFromVaultAndCollateral": {
        "description": "Returns the collateralization of a specific vault and collateral",
        "params": [
          {
            "name": "vault",
            "type": "VaultId"
          },
          {
            "name": "collateral",
            "type": "BalanceWrapper"
          },
          {
            "name": "only_issued",
            "type": "bool"
          }
        ],
        "type": "UnsignedFixedPoint"
      },
      "getIssueableTokensFromVault": {
        "description": "Get the amount of tokens a vault can issue",
        "params": [
          {
            "name": "vault",
            "type": "VaultId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "getPremiumRedeemVaults": {
        "description": "Get all vaults below the premium redeem threshold.",
        "params": [],
        "type": "Vec<(VaultId, BalanceWrapper)>"
      },
      "getRequiredCollateralForVault": {
        "description": "Get the amount of collateral required for the given vault to be at the current SecureCollateralThreshold with the current exchange rate",
        "params": [
          {
            "name": "vault_id",
            "type": "VaultId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "getRequiredCollateralForWrapped": {
        "description": "Get the amount of collateral required to issue an amount of InterBTC",
        "params": [
          {
            "name": "amount_btc",
            "type": "BalanceWrapper"
          },
          {
            "name": "currency_id",
            "type": "CurrencyId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "getVaultCollateral": {
        "description": "Get the vault's collateral (excluding nomination)",
        "params": [
          {
            "name": "vault_id",
            "type": "VaultId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "getVaultTotalCollateral": {
        "description": "Get the vault's collateral (including nomination)",
        "params": [
          {
            "name": "vault_id",
            "type": "VaultId"
          }
        ],
        "type": "BalanceWrapper"
      },
      "getVaultsByAccountId": {
        "description": "Get all vaults that are registered using the given account _id",
        "params": [
          {
            "name": "account_id",
            "type": "AccountId"
          }
        ],
        "type": "Vec<VaultId>"
      },
      "getVaultsWithIssuableTokens": {
        "description": "Get all vaults with non-zero issuable tokens, ordered in descending order of this amount",
        "params": [],
        "type": "Vec<(VaultId, BalanceWrapper)>"
      },
      "getVaultsWithRedeemableTokens": {
        "description": "Get all vaults with non-zero redeemable tokens, ordered in descending order of this amount",
        "params": [],
        "type": "Vec<(VaultId, BalanceWrapper)>"
      }
    }
  },
  "alias": {
    "tokens": {
      "AccountData": "OrmlAccountData",
      "BalanceLock": "OrmlBalanceLock"
    }
  },
  "instances": {
    "balances": [
      "ksm",
      "kbtc",
      "kint",
      "dot",
      "ibtc",
      "intr"
    ]
  },
  "derives": {
    "balances": {}
  }
}

const kintsugiOptions = {
  "typesBundle": {
    "spec": {
      "kintsugi-parachain": kint
    }
  }
}

module.exports = {
  kintsugiOptions,
}
